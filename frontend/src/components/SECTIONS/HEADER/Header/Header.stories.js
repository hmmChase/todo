import React from 'react';

import Header from './Header';

const story = { title: 'SECTIONS/HEADER/Header', component: Header };

const Template = args => <Header {...args} />;

export const LoggedIn = Template.bind({});

LoggedIn.args = { isLoggedIn: true };

export const LoggedOut = Template.bind({});

LoggedOut.args = { isLoggedIn: false };

export default story;
