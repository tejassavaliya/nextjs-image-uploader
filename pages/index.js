import Link from "next/link";
import Nav from "./Nav";

export default function Home() {
  
  return (
    <div>
        <Nav />
      <h1>Welcome to Image upload App</h1>
        <style jsx>
            {`
                h1 {
                    font-size: 28px;
                    text-align: center !important;
                    color: #4aa1f3;
                }
            `}
        </style>
    </div>
    
  )
}
