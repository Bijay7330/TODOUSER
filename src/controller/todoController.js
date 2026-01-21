import todoSchema from "../models/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await todoSchema.create({
      title: title,
      description: description,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Todo has created",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const data = await todoSchema.findOne({
      userId: req.userId,
    });

    return res.status(200).json({
      success: true,
      message: "data fetch successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const delTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await todoSchema.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Todo has deleted successfully",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Id not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const data = await todoSchema.findOne({
      _id: id,
      userId: req.userId,
    });
    if (!data) {
      return res.status(404).json({
        success:false,
        message: "Id not found",
      });
    }
    
    data.title = title;
    data.description = description;
    data.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
