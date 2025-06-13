import { supabase } from "lib/supabase";
import { useEffect, useState } from "react"

export default function Confirmation() {
  const [message, setMessage] = useState('Confirming your account')

  useEffect(() => {
    const confirmUser = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)

      if (error) {
        setMessage('Confirmation failed: ' + error.message)
      } else {
        setMessage('Your email has been confirmed! You can now log in')
      }
    }
    confirmUser()
  }, [])

  return (
    <div className="flex justify-center items-center">
      <div className="flex-column m-4 p-4">
        <img src='/david.jpg' alt="David" className="w-[300px] h-[300px]" />

        <p className="text-2xl text-green-600">{message}</p>
      </div>
    </div>
  )
}