import React from 'react';
import { connect } from 'dva';
import { Button,NavBar,Icon } from 'antd-mobile';
import Example from '../components/Example';

function ExamplePage({ dispatch, example }) {

    console.info('example',example)
    let text1 = '子组件按钮';
    let text2 = '父组件传值给子组件';
    let propsText = {text1,text2};
    return (
        <div>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}> 父组件---导航</NavBar>
            <Example {...propsText}/>
        </div>
    );
}


function mapStateToProps({ example }){
    return { example };
}

export default connect(mapStateToProps)(ExamplePage);
