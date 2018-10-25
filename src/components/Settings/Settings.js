import {Component} from "react";
import React from "react";
import './settings.css'


export const SettingsContainer = (props) => (
    <div {...props} className='SettingsContainer'/>
);

export const ConnectionContainer = (props) => (
    <div {...props} className='ConnectionContainer'/>
);

export const NodeStatusContainer = (props) => (
    <div {...props} className='NodeStatusContainer'/>
);

export const SettingLabel = (props) => (
    <span {...props} className='SettingLabel'/>
);

export const SettingRow = (props) => (
    <div {...props} className='SettingRow'/>
);
