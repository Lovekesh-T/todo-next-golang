import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {

    if(request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup"){
        const token = request.cookies.get("token");
        if (token) return NextResponse.redirect(new URL("/",request.url));

    }
    if(request.nextUrl.pathname === "/"){
      const token = request.cookies.get("token");

      if(!token) return NextResponse.redirect(new URL("/signin",request.url));
    }

    return NextResponse.next();
  }

  


  export const config = {
    matcher: ['/signup','/signin','/'],
  }