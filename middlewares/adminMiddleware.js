const onlyAdminAccess = async (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "you have no permissions",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { onlyAdminAccess };
