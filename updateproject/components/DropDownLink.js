import Link from 'next/link';
import React from 'react'
// how we will render the children inside the drop down
function DropDownLink(props) {
    let { href, children, ...rest } = props;
    return (
        <Link {...rest} href={href}>
            {children}
        </Link>
    )
}

export default DropDownLink