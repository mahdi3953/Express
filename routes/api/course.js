var express = require('express');
var router = express.Router();
var { auth,
    permit,
    } = require('../../functions/authentication');

var Course = require('../../models/course.model');

router.get('/:id', function (req, res) {
    Course.findById(re.params.id).then(function (course) {
        res.send({
            status: 'success',
            data: {
                course: course
            }
        });
    }).catch(function (error) {
        res.send({
            status: "error",
            error: error
        });
    })
});

router.get('/', function (req, res) {
    Course.find({}).then(function (course) {
        res.send({
            status: 'success',
            data: {
                course: course
            }
        });
    }).catch(function (error) {
        res.send({
            status: "error",
            error: error
        });
    })
});

router.delete('/:id', auth, permit('teacher'), function (req, res) {

    Course.findByIdAndRemove(req.params.id).then(function (course) {
        res.send({
            status: 'success',
            data: { message: 'course ' + course.title +' is deleted' }
        });
    }).catch(function (error) {
        res.send({
            status: 'error',
            error: error
        })
    });
});
router.post('/', auth, permit('teacher'), async function (req, res) {
    try {
        let course = new Course();
        course.title = req.body.title;
        course.teacherID = req.body.teacherID;
        await course.save();
        res.send({
            status: 'success',
            data: {
                message: 'Course is Added'
            }
        })
    } catch (error) {
        res.send({
            status: 'error',
            error: error
        })
    }
});

module.exports = router;