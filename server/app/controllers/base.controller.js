exports.baseApi = (req, res) => {
  res.json({ 
    message: "Welcome to bujj.it.",
    status: 200 
  });
};