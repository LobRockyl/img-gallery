import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import React from 'react';
import Card from './elements/Card';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Form from './components/Form';
import Create from './containers/Create'
test('should render card',()=>{
    const wrapper = mount(
        <Card id="1" name="img" image="url" detail="desc" />
    );
    const p = wrapper.find(Card);
    console.log(p)
    expect(p.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();

})
test('should render form for creation of item should have button name create',()=>{
    const wrapper = mount(
        <Form type="Create" />
    );
    const p = wrapper.find(Form);
    console.log(p)
    expect(p.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('button').text()).toEqual("Create");

})

