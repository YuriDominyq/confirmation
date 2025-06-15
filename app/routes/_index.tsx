import { supabase } from "lib/supabase";
import { useEffect, useState } from "react"

export default function Confirmation() {
  const [message, setMessage] = useState<string>('Confirming your account...')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const confirmUser = async () => {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', ''))
        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          setMessage('❌ Invalid confirmation link')
          setIsLoading(false)
          return
        }

        const { error } = await supabase.auth.setSession({
          access_token: access_token,
          refresh_token: refresh_token,
        })

        if (error) {
          console.error('Confirmation error:', error)
          setMessage('❌ Confirmation failed: ' + error.message)
        } else {
          setMessage('✅ Email confirmed! You can now close this window and return to the app.')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setMessage('❌ An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    confirmUser()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center m-4 p-6 bg-white rounded-lg shadow-lg">
        <img
          src='/turnuplogo.jpg'
          alt="TurnUp Logo"
          className="w-[200px] h-[200px] rounded-full mb-4"
        />

        <div className="text-center">
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          )}

          <p className={`text-xl font-medium ${message.includes('✅') ? 'text-green-600' :
            message.includes('❌') ? 'text-red-600' :
              'text-blue-600'
            }`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}