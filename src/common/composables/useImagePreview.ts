import { ref } from 'vue'
import Swal from 'sweetalert2'

export function useImagePreview() {
  const preview = ref('')
  const fileInput = ref<HTMLInputElement | null>(null)

  const trigger = () => {
    if (fileInput.value) {
      // 이미지 더블 클릭 시 change 이벤트가 발생해 기존 이미지가 유지되므로, 이미지가 변경이 되지 않는점 방지
      fileInput.value.value = ''
    }
    fileInput.value?.click()
  }

  const handleSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        preview.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const reset = async () => {
    if (!preview.value) return
    const result = await Swal.fire({
      title: '이미지 초기화',
      text: '현재 프로필 이미지를 초기화하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    })
    if (result.isConfirmed) {
      preview.value = ''
    }
  }

  return {
    preview,
    fileInput,
    trigger,
    handleSelect,
    reset,
  }
}
