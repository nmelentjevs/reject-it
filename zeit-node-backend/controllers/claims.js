const nodemailer = require('nodemailer');
const voucher_codes = require('voucher-code-generator');

// Middleware
const asyncHandler = require('../middleware/async');

// Utils
const ErrorResponse = require('../utils/errorResponse');
const Claim = require('../models/Claim');
const Email = require('../models/Email');

// @desc    Get all claims
// @route   GET /claims/
// @access  Public

exports.getClaims = asyncHandler(async (req, res, next) => {
  const user = await Email.findOne({ email: req.query['victim/email'] });
  if (!user) {
    return next(new ErrorResponse('Email not found!', 404));
  }
  if (user.confirmationCode !== req.confirmationCode) {
    return next(new ErrorResponse('Wrong confirmation code!', 403));
  }
  res.status(200).json(res.filtering);
});

// @desc    Post new claim
// @route   POST /claims/send
// @access  Public

exports.sendClaim = asyncHandler(async (req, res, next) => {
  let { victim, suspect, attachments } = req.body;

  attachments = attachments.map(({ name, file }) => {
    return {
      filename: name + '.png',
      content: file,
      encoding: 'base64'
    };
  });

  const claim = new Claim({
    victim,
    suspect,
    evidence: attachments,
    information: suspect.additional
  });
  await claim.save();

  const user = await Email.findOne({ email: victim.email });

  let confirmationCode;
  if (!user) {
    confirmationCode = voucher_codes.generate({
      length: 8,
      count: 1
    })[0];

    const newUser = new Email({
      email: victim.email,
      confirmationCode
    });

    await newUser.save();
  } else {
    console.log(user);
    confirmationCode = user.confirmationCode;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'picblocklegal@gmail.com',
      pass: 'daIIry00!!'
    }
  });

  const emailHtml = `
  <div>
    <h2>Victim details:</h2>
    <p>Firstname: ${victim.firstName}</p>
    <p>Lastname: ${victim.lastName}</p>
    <p>Email: ${victim.email}</p>
    <p>Phone: ${victim.phone}</p> 
    <p>Address: ${victim.address}</p>
  </div>
  <div>
    <h2>Suspect details:</h2>
    <p>Firstname: ${suspect.firstName}</p>
    <p>Lastname: ${suspect.lastName}</p>
    <p>Email: ${suspect.email}</p>
    <p>Phone: ${suspect.phone}</p>
    <p>Address: ${victim.address}</p>
  </div>
  <div>
    <h4>Email confirmation code to access your case status:</h4>
    <p>${confirmationCode}</p>
  </div>`;

  const mailOptions = {
    from: 'picblocklegal@gmail.com',
    to: 'kingusha2333@gmail.com',
    subject: 'New case submitted',
    html: emailHtml,
    attachments
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(
        new ErrorResponse('There was an error sending your application!', 500)
      );
    } else {
      res.sendStatus(200).json({
        success: true,
        message: 'Application submitted, wait for us to contact you soon!'
      });
    }
  });
});
