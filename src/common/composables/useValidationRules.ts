export function useValidationRules() {
  const nameRule = [
    (v: string) => !!v || '이름 또는 별명을 입력해주세요.',
    (v: string) => {
      const validChar = /^[가-힣a-zA-Z]+$/.test(v)
      const validLength = v.length >= 2 && v.length <= 20
      if (!validChar) return '한글과 영문만 입력할 수 있습니다.'
      if (!validLength) return '2자 이상 20자 이하로 입력해주세요.'
      return true
    },
  ]

  // 아이디 (예시) - 영문/숫자 5~16자
  const userIdRule = [
    (v: string) => !!v || '아이디를 입력해주세요.',
    (v: string) =>
      /^[a-zA-Z0-9]{5,16}$/.test(v) || '영문과 숫자만 사용하여 5~16자 이내여야 합니다.',
  ]

  // 이메일
  const emailRule = [
    (v: string) => !!v || '이메일을 입력해주세요.',
    (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '올바른 이메일 형식이 아닙니다.',
  ]

  // 비밀번호 (예시) - 영문, 숫자, 특수문자 포함 8~20자
  const passwordRule = [
    (v: string) => !!v || '비밀번호를 입력해주세요.',
    (v: string) =>
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,20}$/.test(v) ||
      '영문, 숫자, 특수문자를 포함한 8~20자여야 합니다.',
  ]

  // 휴대폰 번호 - 하이픈 포함한 000-0000-0000 형식
  const phoneNumberRule = [
    (v: string) => !!v || '휴대폰 번호를 입력해주세요.',
    (v: string) =>
      /^\d{3}-\d{3,4}-\d{4}$/.test(v) ||
      '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)',
  ]

  return {
    nameRule,
    userIdRule,
    emailRule,
    passwordRule,
    phoneNumberRule,
  }
}
