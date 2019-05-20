import React from 'react';
import CybLink from '../CybLink';
import './AppMenu.css';
import { Pane, Pill } from '@cybercongress/ui';

const Logo = props => (
    <CybLink { ...props } className='logo'>
        logo
    </CybLink>
);

export const LogoLink = ({ onClick }) => (
    <div className='menu-logo'>
        <Logo dura='' onClick={ onClick } />
    </div>
);

export const AppStoreLink = () => (
    <CybLink dura='apps.cyb' className='app-store-link'>
        App Store
    </CybLink>
);

const Items = ({
    item, deleteAppFromMenu, selected, ...props
}) => (
    // <span className='bookmarks__item' key={ item.rootDura }>
    //     <CybLink dura={ item.rootDura }>
    //         {item.name}
    //     </CybLink>
    //     <button
    //       type='button'
    //       className='bookmarks__remove-btn'
    //       onClick={ () => deleteAppFromMenu(item.rootDura) }
    //     >
    //     &#128465;
    //     </button>
    // </span>
    <Pane
      display='flex'
      paddingY={ 10 }
      alignItems='center'
      className={ ` bookmarks__item ${selected ? 'active' : ''}` }
      key={ item.rootDura }
    >
        <Pane
          display='flex'
          width='100%'
          height={ 30 }
          paddingLeft={ 20 }
          paddingRight={ 10 }
          justifyContent='space-between'
          alignItems='center'
        >
            <Pane alignItems='center' flexGrow={ 1 } display='flex'>
                {/* <Pane className={ styles.imgItems } marginRight={ 17 } width={ 24 } height={ 24 }>
              <img src={ item.img ? item.img : img } />
          </Pane> */}
                <CybLink { ...props } dura={ item.rootDura }>
                    {item.name}
                </CybLink>
            </Pane>
            {item.pill && (
                <Pill
                  isSolid
                  width={ 22 }
                  height={ 16 }
                  boxShadow='0px 0px 17px 2px #36d6ae'
                  style={ { backgroundColor: '#36d6ae', color: '#000' } }
                >
                    {item.pill}
                </Pill>
            )}
            <div className='bookmarks__group_btn'>
                {/* <button
                  type='button'
                  className='bookmarks__edit_btn'
                  onClick={ () => deleteAppFromMenu(item.rootDura) }
                /> */}
                <button
                  type='button'
                  className='bookmarks__remove_btn'
                  onClick={ () => deleteAppFromMenu(item.rootDura) }
                />
            </div>
        </Pane>
    </Pane>
);

// export const Bookmarks = ({ items, deleteMenuItem }) => (
//     <div className='bookmarks'>
//         {items.map(item => (
//             <Items
//               key={ item.rootDura }
//               item={ item }
//               deleteAppFromMenu={ deleteMenuItem }
//             />
//         ))}
//     </div>
// );
export class Bookmarks extends React.Component {
    state = {
        selectedIndex: 0,
    };

    onCustomClick = (index) => {
        this.setState({
            selectedIndex: index,
        });
    };

    render() {
        const { items, deleteMenuItem, ...props } = this.props;

        return (
            <div className='bookmarks'>
                {items.map((item, index) => (
                    <Items
                      selected={ index === this.state.selectedIndex }
                      onClick={ e => this.onCustomClick(index) }
                      { ...props }
                      key={ item.rootDura }
                      item={ item }
                      deleteAppFromMenu={ deleteMenuItem }
                    />
                ))}
            </div>
        );
    }
}
