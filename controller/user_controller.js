import User from '../model/user_model.js';

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        const validationError = userData.validateSync();
        if (validationError) {
            return res.status(400).json({
                message: validationError.message,
            });
        }

        const saveData = await userData.save();
        res.status(200).json({
            message: 'User created successfully',
            saveData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getAll = async (req, res) =>{
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({
                message: 'No users found',
            });
        }
        res.status(200).json({
            message: 'Users fetched successfully',
            userData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getOne = async (req, res) =>{
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({
                message: 'No user found',
            });
        }
        res.status(200).json({
            message: 'User fetched successfully',
            userData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const update = async (req, res) =>{
    try {
        const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userData) {
            return res.status(404).json({
                message: 'No user found',
            });
        }
        res.status(200).json({
            message: 'User updated successfully',
            userData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        if (!userData) {
            return res.status(404).json({
                message: 'No user founding',
            });
        }
        res.status(200).json({
            message: userData.fname+"s' data deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}