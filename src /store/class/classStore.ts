import {nanoid} from '@reduxjs/toolkit';
import {ClassStateTypes} from '../../types/classStateTypes';

const ClassStore: ClassStateTypes = {
    fetchingClass: false,

    classDetail:[],
 
    classData:[],

};

export default ClassStore;