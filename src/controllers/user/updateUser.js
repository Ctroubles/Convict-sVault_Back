const axios = require("axios");
const User= require("../../models/user");
const {getUser}=require("./getUser.js")


const deleteUser = async (id) =>{
        const userxd = await User.findOne({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.isActive = false
        return await userxd.save().catch(e => console.log(e))
}

const activateUser = async(id)=>{
    const userxd = await User.findOne({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.isActive = true
        return await userxd.save().catch(e => console.log(e))
}

const updateUser = async(id, data) => {
        console.log(data)
        const user = await User.findOne({ _id: id });
        if(!user) throw 'No se ha encontrado un componente con ese ID';
        if(data.name) user.name = data.name;
        if(data.surname) user.surname = data.surname;
        // if(data.isActive) user.isActive = data.isActive;
        if(data.phone) user.phone = data.phone;
        if(data.dni) user.dni = data.dni;
        if(data.gender) user.gender = data.gender;
        user.updated_at = Date.now();
        const respuesta = await user.save();

        return user
}

const giveAdmin = async(id) =>{
    const userxd = await User.findOne({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.isAdmin = true
        return await userxd.save().catch(e => console.log(e))
}

const removeAdmin = async(id) =>{
    const userxd = await User.findOne({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.isAdmin = false
        return await userxd.save().catch(e => console.log(e))
}

const addOrder = async(id, order) =>{
    const userxd = await User.findOne({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.orders.push(order)
        return await userxd.save().catch(e => console.log(e))
}


module.exports= {deleteUser, activateUser, updateUser, giveAdmin, removeAdmin, addOrder}