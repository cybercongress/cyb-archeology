import React from 'react';
import CybLink from '../CybLink';
import {Link as LinkRouter} from 'react-router';
import './Home.css';

const Home = (props) => (
    <div {...props} className='home'/>
);


export const Items = ({children}) => (
    <div className='items'>
        {children}
    </div>
);

export const Item = ({children, dura, ...props}) => (
    props.disabled ? (
        <span className='item' {...props}>{children}</span>
    ) : (
        <CybLink dura={dura} className='item' {...props}>
            {children}
        </CybLink>
    )
);

export const Arrow = () => (
    <span className='arrow'/>
);

export const ItemTitle = ({children, gray}) => {
    const className = 'itemTitle  ' + (gray ? 'itemTitleGray' : '');
    return <span className={className}>
    {children}
  </span>
};

export const Image = ({type}) => (
    <div className={`image image${type}`}>
    </div>
);

const Link = (props) => {
    if (/^https?:\/\//.test(props.to)) {
        return <a href={props.to} {...props}> </a>
    } else {
        return <LinkRouter {...props} />
    }
};


export const LinkList = ({children}) => (
    <nav className='linkList'>
        {children}
    </nav>
);

// export const LinkItem = ({ children, to, icon, ...props}) => (
//     <Link to={to} className={`linkItem linkItem${icon}`} {...props}>
//         {children}
//     </Link>
// );

export const LinkItem = ({ children, to, icon, ...props}) => (
    <a to={to} className={`linkItem linkItem${icon}`} {...props}>
        {children}
    </a>
);


export default Home;
