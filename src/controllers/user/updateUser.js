const User= require("../../models/user");
const {getUser}=require("./getUser.js")
const mongoose = require('mongoose');


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
        if(!user) throw 'No se ha encontrado un uario con ese ID';
        if(data.name) user.name = data.name;
        if(data.surname) user.surname = data.surname;
        if(data.phone) user.phone = data.phone;
        if(data.dni) user.dni = data.dni;
        if(data.gender) user.gender = data.gender;
        user.updated_at = Date.now();
        const respuesta = await user.save();

        return user
}
const updateUserAdrees = async(id, data) => {
    if(!data) throw 'La dirección no puede ser vacía';

    data._id = new mongoose.Types.ObjectId();
    const user = await User.findByIdAndUpdate(
        id,
        { $push: { addresses: data }, $set: { updated_at: Date.now() } },
        { new: true, useFindAndModify: false } 
    );

    if (!user) throw 'No se ha encontrado un usuario con ese ID';

    return user;
}
const updateAddressById = async (userId, addressId, newData) => {
    const user = await User.findById(userId, "addresses");
    if (!user) {
      throw new Error('User not found');
    }
    const indexAddress = user.addresses.findIndex(
        (address) => address._id.toString() === addressId
    );
    if (indexAddress < 0) {
      throw new Error('Address not found');
    }
    user.addresses[indexAddress] = {
        ...user.addresses[indexAddress],
        ...newData,
    }
    const updatedUser = await user.save(); 
    return updatedUser;
};
  
const deleteAddress = async(userId, addressId) => {
    const user = await User.findById(userId, 'addresses');
    user.addresses = user.addresses.filter(address => address._id.toString() !== addressId);
    const updatedUser = await user.save();
    return updatedUser;
}

const giveAdmin = async(id) =>{
    const userxd = await User.findById({_id: id})
        if(!userxd){
            throw 'No se ha encontrado un usuario con ese ID'
        }
        userxd.isAdmin = true
        return await userxd.save().catch(e => console.log(e))
}

const removeAdmin = async(id) =>{
    const userxd = await User.findById({_id: id})
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


module.exports= {deleteUser, activateUser, updateUser, giveAdmin, removeAdmin, addOrder, updateUserAdrees, deleteAddress,updateAddressById}