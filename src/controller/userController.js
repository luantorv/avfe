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

// Buscar usuario por un valor específico
export const getUserByValue = async (req, res) => {
    try {
      const { name, lastname, email, guest} = req.query; // Obteniendo los valores de la consulta en la URL
  
      // Verificar que al menos un parámetro sea proporcionado
      if (!name && !lastname && !email && !guest) {
        return res.status(400).json({ message: 'Se requiere al menos un parámetro de consulta (name, lastname, email o guest).' });
      }
  
      // Construir la consulta dinámicamente
      const query = {};
      if (name) query.name = name; // Agregar filtro por nombre si se proporciona
      if (lastname) query.lastname = lastname; // Agregar filtro por apellido si se proporciona
      if (email) query.email = email; // Agregar filtro por email si se proporciona
      if (guest) query.guest = guest; // Agregar filtro por guest si se proporciona
  
      // Buscar usuarios que coincidan con la consulta
      const users = await User.find(query);
  
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios que coincidan con los valores proporcionados.' });
      }
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar usuarios.' });
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


// Eliminar varios usuarios por sus IDs
export const deleteUsers = async (req, res) => {
    try {
        // Obtener el array de usuarios desde el cuerpo de la solicitud
        const users = req.body;  // Asumiendo que el array de usuarios se pasa en el cuerpo de la solicitud

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: "Se requiere un array de usuarios con al menos un _id." });
        }

        // Extraer los _id de los usuarios
        const ids = users.map(user => user._id);
        
        // Eliminar los usuarios usando sus _id
        const deletedUsers = await User.find({ '_id': { $in: ids } }).select('_id name lastname email'); // Seleccionar solo los campos necesarios
        if (deletedUsers.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios con los _id proporcionados." });
        }

        // Eliminar los usuarios encontrados
        await User.deleteMany({ '_id': { $in: ids } });

        // Devolver los usuarios eliminados
        res.status(200).json({ message: "Usuarios eliminados correctamente", users: deletedUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
