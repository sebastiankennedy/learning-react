import React, {Component} from 'react';
import './index.less';
import avatar from './../../resources/image/avatar.png';
import {Avatar, Icon, Menu, Dropdown} from 'antd';

const marginAttribute = {margin: "0 5px"};
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                <Icon type="user" style={marginAttribute}/>
                <span style={marginAttribute}>个人中心</span>
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                <Icon type="edit" style={marginAttribute}/>
                <span style={marginAttribute}>个人设置</span>
            </a>
        </Menu.Item>
        <Menu.Item style={{borderTop: "1px solid #e8e8e8"}}>
            <a target="_blank" rel="noopener noreferrer" href="#">
                <Icon type="logout" style={marginAttribute}/>
                <span style={marginAttribute}>退出登录</span>
            </a>
        </Menu.Item>
    </Menu>
);

class Header extends Component {
    state = {
        avatar: avatar,
        username: "Sebastian"
    }

    render() {
        return (
            <div className="header-wrapper">
                <div className="header">

                    <span className="header-action">
                        <Icon type="question-circle"/>
                    </span>
                    <span className="header-action">
                        <Icon type="search"/>
                    </span>
                    <span className="header-action">
                        <Icon type="notification"/>
                    </span>
                    <Dropdown overlay={menu}>
                    <span className="header-action">
                            <a className="ant-dropdown-link" href="#">
                                <Avatar src={this.state.avatar}/> {this.state.username}
                            </a>
                    </span>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default Header;