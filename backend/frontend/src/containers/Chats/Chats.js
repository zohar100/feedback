import React from 'react';
import { useSelector} from 'react-redux';

import ChatsList from '../../components/ChatsList/ChatsList'; 

const Chats = () => {
    const user = useSelector(state => state.auth.user);
    const chats = useSelector(state => state.chat.chats);

    return(
        <ChatsList            
        chats={chats}
        user={user}
        mobile={true}/>
    )
}

export default Chats;  