import { withAuth,NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request:NextRequestWithAuth){
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)
        if(request.nextUrl.pathname.startsWith("/pages/dashboard")){
            if(request.nextauth.token?.role == "pharmacist"){
                return NextResponse.rewrite(
                    new URL("/pages/dashboard/pharmacist",request.url)
                )    
            }
            if(request.nextauth.token?.role == "customer"){
                return NextResponse.rewrite(
                    new URL("/pages/dashboard/customer",request.url)
                )    
            }
            return NextResponse.rewrite(
                new URL("/pages/auth/signin")
            )
        }
        if(request.nextUrl.pathname.startsWith("/pages/dashboard/customer") && request.nextauth.token?.role !== "customer"){
            return NextResponse.rewrite(
                new URL("/pages/auth/signin")
            )
        }
        if(request.nextUrl.pathname.startsWith("/pages/dashboard/pharmacist") && request.nextauth.token?.role !== "pharmacist"){
            return NextResponse.rewrite(
                new URL("/pages/auth/signin")
            )
        }
    },
    {
        callbacks:{
            authorized:({token})=> !!token
        },

    }
)

//applies next-auth only to matching routes - can be regex
export const config = {matcher:["/pages/dashboard","/pages/dashboard/customer","/pages/dashboard/pharmacist"]}