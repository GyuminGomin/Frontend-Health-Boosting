import { ref } from 'vue'
import Swal from 'sweetalert2'

type Mode = 'single' | 'multi'

export function useImagePreview(mode: Mode = 'single') {
  const preview = ref('') // single 미리보기
  const previews = ref<string[]>([]) // multi 미리보기
  const fileInput = ref<HTMLInputElement | null>(null)
  const selectedFiles = ref<File[]>([]) // 여러 파일 저장

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
    if (mode === 'single') {
      preview.value = ''
    } else {
      previews.value = []
    }

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (mode === 'single' && index === 0) {
          preview.value = result
        } else if (mode === 'multi') {
          previews.value.push(result)
        }
      }
      reader.readAsDataURL(file)
      selectedFiles.value.push(file)
    })
  }

  const reset = async () => {
    const hasData = mode === 'single' ? preview.value : previews.value.length > 0
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
      selectedFiles.value = []
      if (mode === 'single') {
        preview.value = ''
      } else {
        previews.value = []
      }
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }
  }

  return {
    mode,
    preview, // 단일
    previews, // 다중
    selectedFiles,
    fileInput,
    trigger,
    handleSelect,
    reset,
  }
}
