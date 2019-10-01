import React from 'react';
import './themes.scss';
import './App.scss';

import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="theme_space_default theme_size_default theme_color_project-default theme_gap_small theme_font_default">
        <Layout>
            <Header/>
            <Main>Hi</Main>
            <Footer/>
        </Layout>
    </div>
  );
}

export default App;
