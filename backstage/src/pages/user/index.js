import React from 'react'
import './index.less'
import {Card} from 'antd'

class User extends React.Component{
    render(){
        return(
            <div>
                <Card>
                    Search
                </Card>
                <Card>
                    Table
                </Card>
            </div>
        );
    }
}

export default User;