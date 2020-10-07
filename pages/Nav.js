import Link from "next/link";

function Nav() {
    return <div>
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/ImageDragDrop">
                    <a>Drag Drop</a>
                </Link>
                <Link href="/Upload">
                    <a>Upload</a>
                </Link>
            </li>
        </ul>
        <style jsx>
            {`
                ul {
                    list-style-type: none;
                    background-color:black;
                    padding:10px;
                }
                li {
                    display: inline;
                    margin-right: 10px;
                    color: green;
                    font-size: 18px;
                }
                a {
                    color: #fff;
                    margin-right: 10px;
                    cursor: pointer;
                }
                
            `}
        </style>
    </div>
}

export default Nav;
