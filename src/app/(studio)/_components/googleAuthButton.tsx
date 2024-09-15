import { generateGoogleConsentUrl } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa6"

export default function GoogleOAuthButton () {
    return (
        <div className="w-full">
            <Button className="flex w-full" size={"lg"} onClick={async() => {
               const result = await generateGoogleConsentUrl()
               if(result?.url){
                     window.location.href = result.url.toString()
               }

            }}>
                <FaGoogle className="mr-2"/>
                Login with Google
            </Button>
            </div>
    )
}