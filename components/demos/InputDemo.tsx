import { useState } from 'react'
import { Input, SearchIcon } from '@idbrnd/design-system'

/** 기본: 라벨 + 안내 문구 */
export function InputBasicDemo() {
  const [email, setEmail] = useState('')

  return (
    <Input
      headingContent="이메일"
      placeholder="이메일을 입력하세요"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      description="가입 안내 메일을 받을 주소입니다."
    />
  )
}

/** 상태: 에러 / 성공 / 비활성화 */
export function InputStatesDemo() {
  const [password, setPassword] = useState('1234')
  const [id, setId] = useState('idbrnd')

  return (
    <>
      <Input
        headingContent="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage="비밀번호가 일치하지 않습니다."
      />
      <Input
        headingContent="아이디"
        variant="success"
        value={id}
        onChange={(e) => setId(e.target.value)}
        description="사용 가능한 아이디입니다."
      />
      <Input
        headingContent="닉네임"
        value="수정할 수 없는 값"
        onChange={() => {}}
        disabled
      />
    </>
  )
}

/** 외형: 아이콘 슬롯 / fill / small / 너비 지정 */
export function InputAppearanceDemo() {
  const [keyword, setKeyword] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <>
      <Input
        heading={false}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        leadingIcon={<SearchIcon size={20} />}
      />
      <Input
        headingContent="금액"
        designType="fill"
        size="small"
        width={240}
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </>
  )
}
