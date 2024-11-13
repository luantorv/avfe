// userController.js
import User from './../model/user.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, guest, carrers } = req.body;

        // Validación para evitar campos vacíos
        if (!name || !lastname || !email || !password || guest === undefined || !carrers) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const newUser = new User({
            name,
            lastname,
            email,
            password,
            guest,
            carrers
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        //console.log(req.query)
        //console.log('Query _id:', req.query._id);
        //console.log('Tipo de _id:', typeof req.query._id);

        const _id = req.query._id
        // const { _id } = req.params   // por alguna razón de ésta forma no funciona

        //console.log(_id)

        if ( !_id ) {
            return res.status(400).json({ message: 'Se requiere el parámetro _id.' });
        }

        const user = await User.findById(_id);
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar un usuario por email
export const getUserByEmail = async (req, res) => {
    try {
        // const { email } = req.params;
        //console.log(req.query)
        const email = req.query.email   // Obteniendo el email de los parámetros de la ruta

        if ( !email ) {
            return res.status(400).json({ message: 'Se requiere el parámetro email.' });
        }

        const user = await User.findOne({ email }); // Buscando usuario por email

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el usuario por email.' });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Solo actualiza los campos que están definidos en `req.body`
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
