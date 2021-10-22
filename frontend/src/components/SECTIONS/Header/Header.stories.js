import React from 'react';

import Header from './Header';

export default { title: 'SECTIONS/HEADER/Header', component: Header };

const Template = args => <Header {...args} />;

export const LoggedIn = Template.bind({});

LoggedIn.args = { isLoggedIn: true };

export const LoggedOut = Template.bind({});

LoggedOut.args = { isLoggedIn: false };
