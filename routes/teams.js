var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

var teamsController = require("../controllers/teams");

/* GET list of teams. */
router.get("/", (req, res) => {
  teamsController
    .getAll()
    .then(teams => res.send(teams))
    .catch(err => res.send(err));
});

/* GET a team */
router.get("/:id", (req, res) => {
  teamsController
    .getOne(req.params.id)
    .then(team => res.send(team))
    .catch(err => res.send(err));
});

/* CREATE a team */
router.post("/create_team", (req, res) => {
  teamsController
    .create({ name: req.body.name })
    .then(team => res.send(team))
    .catch(err => res.send(err));
});

/* Send members emails to join the team */
router.post("/add_members", (req, res) => {
  nodemailer
    .createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "deed36bfaea27e",
          pass: "7730a5a5f0a126"
        }
      });

      req.body.members.map(member => {
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Timeable 👻" <admin@timeable.com>', // sender address
          to: member.email, // list of receivers
          subject: `Join Timeable`, // Subject line
          text: `Hello! Some douche wants you in its team. Join here: yolo/id`, // plain text body
          html: `<h3>Hi there!</h3><br/> 
            <p>Some douche called ${req.body.teamLead} 
            wants you to join their team. <br/>
            <a href="http://localhost:500/new_users/${req.body.team}/${
            member.role
          }">
            Click here!
            </a>.
            <br/> Regards, <br/> <em>Timeable Team</em></p>` // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
      });
    })
    .then(response => res.send(response))
    .catch(error => res.send(error));
});

// TO TEST
/* UPDATE a team */
router.get("/update/:id/:name", (req, res) => {
  teamsController
    .update(req.params.id, req.params.name)
    .then(
      // response is gt 0 if it finds a team with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404))
    )
    .catch(err => console.log("Error: ", err));
});

/* DELETE a team */
router.get("/delete/:id", (req, res) => {
  teamsController
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log("Error: ", err));
});

module.exports = router;
