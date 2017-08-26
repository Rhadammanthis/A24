import React from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import Splash from './components/Splash'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}
            leftButtonIconStyle = {{ tintColor:'#999'}} >

            <Scene key="splash" component={Splash} initial={true} hideNavBar={true} />
            <Scene key="content" type={ActionConst.RESET}>
                <Scene key="movieList" component={MovieList} title="Movies" hideNavBar={false} hideBackImage="true"/>
                <Scene key="movieDetail" component={MovieDetail} hideNavBar={false} />
            </Scene>

        </Router>


    );
};

const styles = {
    navBar: {
        backgroundColor: 'white', // changing navbar color
    },
    navTitle: {
        color: 'black', // changing navbar title color
    },
    routerScene: {
        paddingTop: 50, // some navbar padding to avoid content overlap
    },
}

export default RouterComponent;