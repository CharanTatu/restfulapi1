
const Student = require("../models/studnets");
//const Work=require("../models/studnets");
//create a student..
exports.studentsaveall = async (req, res) => {
    try {
        const stud = await Student.find({ $or: [{ phone: req.body.phone }, { email: req.body.email }] }) //|| await Student.find({ email:req.body.email });
        console.log(stud);
        if (stud.length) {
            throw new Error("check mobile number or email already present")
        }
        else {
            const user = new Student(req.body);
            await user.save();
            res.send(user);
        }
    }
    catch (e) {
        //console.log(e);
        res.status(400).send("" + e)
    }
}
// get all students data
exports.studentgetall = async (req, res) => {

    try {
        const { page = 1, limit = 4 } = req.query;
        const studentsData = await Student.find()
            .limit(limit * 1).skip((page - 1) * limit).sort({address:1});
        //aggregate ([{
        //     $lookup:
        //     {
        //         from: "works",
        //         let: { student_address: "$address" },
        //         pipeline:
        //             [{ $match: { $expr: { $eq: ["$$student_address", "$address"] } } },
        //             { $project: { _id: 0, pincode: 1, name: 1, address: 1, email: 1 } }],
        //         as: "matches"
        //     }
        // }])

        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
}
// Delete Student data...
exports.studentdelete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        //await Student.findByIdAndDelete(req.params.id);
        //Student.deleteOne({name:"ramn singh"})
        if (!req.params.id) {
            return res.status(400), send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
}
//Update student data...
exports.studentupdate = async (req, res) => {
    try {
        const stude = await Student.find({ $or: [{ phone: req.body.phone }, { email: req.body.email }] });
        if (stude.length) {
            throw new Error("check data already present");
        }
        else {
            const _id = req.params.id;
            const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            // .update({name:ram singh},{$set:{"address":"jalna"}});
            //findByIdAndUpdate(_id, req.body, 
            res.send(updateStudents);
        }
    }
    catch (e) {
        res.status(400).send("" + e);
    }
}


