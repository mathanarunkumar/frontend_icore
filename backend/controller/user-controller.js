const multer = require('multer');
const xlsx = require('xlsx');
const User = require('.././models/user-model');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all users
exports.getUser = async(req, res) => {
    try {
    const users = await User.find().select('-password');
    res.json(users);
    } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    }
}



// Update user
exports.updateUser = async(req,res)  =>  {
    try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        ).select('-password');
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }

}

// Delete user

exports.deleteUser= async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }



// Upload users from Excel
exports.adduploadUsers = async (req, res) => {
    try {
      // Check if file exists and is in correct format
      if (
        !req.file ||
        req.file.mimetype !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        return res
          .status(400)
          .json({ message: "Invalid file format. Please upload an Excel (.xlsx) file." });
      }
  
      // Parse Excel file
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
  
      // Validate and save users
      const savedUsers = [];
      for (const row of data) {
        // Ensure required fields are present
        if (
          !row.First_Name ||
          !row.Last_Name ||
          !row.Role ||
          !row.DOB ||
          !row.Gender ||
          !row.Email ||
          !row.Mobile ||
          !row.City ||
          !row.State
        ) {
          return res
            .status(400)
            .json({ message: "Invalid data. Please ensure all fields are provided." });
        }
  
        // Create and save user
        const user = new User({
          first_name: row.First_Name,
          last_name: row.Last_Name,
          role: row.Role,
          dob: row.DOB,
          gender: row.Gender,
          email: row.Email,
          mobile: row.Mobile,
          city: row.City,
          state: row.State,
        });
  
        await user.save();
        savedUsers.push(user);
      }
  
      res.json({
        message: "Users imported successfully",
        users: savedUsers,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  



// Export users to Excel
exports.exportUser = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      const formattedUsers = users.map((user) => ({
        First_Name: user.first_name,
        Last_Name: user.last_name,
        Role: user.role,
        DOB: user.dob,
        Gender: user.gender,
        Email: user.email,
        Mobile: user.mobile,
        City: user.city,
        State: user.state,
        Created_At: user.created_at,
        Updated_At: user.updated_at,
      }));
  
      const worksheet = xlsx.utils.json_to_sheet(formattedUsers);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");
  
      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="users.xlsx"'
      );
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  



  


