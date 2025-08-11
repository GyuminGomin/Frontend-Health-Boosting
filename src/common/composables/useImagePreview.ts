import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

type Mode = 'single' | 'multi'
type Options = { initialUrl?: string }

export function useImagePreview(mode: Mode = 'single', options: Options = {}) {
  const serverUrl = ref(options.initialUrl ?? '') // 서버에서 받은 기본 이미지
  const preview = ref('') // single 미리보기
  const previews = ref<string[]>([]) // multi 미리보기
  const fileInput = ref<HTMLInputElement | null>(null)
  const selectedFiles = ref<File[]>([]) // 여러 파일 저장
  const removed = ref(false) // 프로필 이미지 제거 여부(서버에 삭제 의사 전달용)

  // 화면에 실제로 표시할 src
  const displaySrc = computed(() => preview.value || serverUrl.value || '')

  const trigger = () => {
    if (fileInput.value) {
      // 이미지 더블 클릭 시 change 이벤트가 발생해 기존 이미지가 유지되므로, 이미지가 변경이 되지 않는점 방지
      fileInput.value.value = ''
    }
    fileInput.value?.click()
  }

  /**
   * 한 개의 이미지만 올리는 곳에는 미리보기도 가능하게 설정할거고
   * 여러 개 올리는 곳에는 그냥 파일 개수에 따라 여러개 S3로 올리게 설정
   * @param event 클릭 이벤트
   * @returns
   */
  const handleSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    const files = input.files
    // 만약 다중 미리보기 files = ref<string[]>([])

    if (!files || files.length === 0) return

    // 초기화
    selectedFiles.value = []
    removed.value = false // 새로 선택하면 '삭제' 상태 해제
    if (mode === 'single') {
      // 이전 objectURL 정리 (dataURL이면 무시)
      if (preview.value.startsWith('blob:')) URL.revokeObjectURL(preview.value)
      preview.value = ''
    } else {
      previews.value.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u))
      previews.value = []
    }

    Array.from(files).forEach((file, index) => {
      // 가벼운 미리보기: objectURL 권장 (성능/ 메모리)
      const url = URL.createObjectURL(file)
      if (mode === 'single' && index === 0) {
        preview.value = url
      } else if (mode === 'multi') {
        previews.value.push(url)
      }
      selectedFiles.value.push(file)
    })
  }

  // 외부에서 서버 URL 세팅(프로필 조회 후 사용)
  const setPreviewFromUrl = (url: string) => {
    serverUrl.value = url || ''
    removed.value = false
    // 로컬 미리보기가 있다면 그대로 우선 표시
  }

  const reset = async () => {
    const hasData =
      mode === 'single' ? !!(preview.value || serverUrl.value) : previews.value.length > 0
    if (!hasData) return

    const result = await Swal.fire({
      title: '이미지 초기화',
      text: '현재 프로필 이미지를 초기화하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    })
    if (result.isConfirmed) {
      // objectURL 정리
      if (preview.value.startsWith('blob:')) URL.revokeObjectURL(preview.value)
      preview.value = ''
      previews.value.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u))
      previews.value = []
      selectedFiles.value = []
      if (fileInput.value) {
        fileInput.value.value = ''
      }

      // 서버 URL도 비워서 기본 아이콘 보이게 하고, 삭제 의사 표시
      serverUrl.value = ''
      removed.value = true
    }
  }

  return {
    mode,
    serverUrl, // 서버에서 받은 원본 URL
    preview, // 단일
    previews, // 다중
    displaySrc, // 화면에 바인딩할 실제 src (preview 우선)
    selectedFiles,
    removed, // true면 서버에 "프로필 이미지 삭제" 요청 신호로 사용
    fileInput,
    trigger,
    handleSelect,
    setPreviewFromUrl,
    reset,
  }
}
