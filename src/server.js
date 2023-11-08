const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
require("dotenv").config();
const path = require("path");
const studentScheduleRouter = require("./router/studentScheduleRouter");
const facultyScheduleRouter = require("./router/facultyScheduleRouter");
const subjectRouter = require("./router/subjectRouter");
const strandRouter = require("./router/strandRouter");
const sectionRouter = require("./router/sectionRouter");
const facultyRouter = require("./router/facultyRouter");
const studentRouter = require("./router/studentRouter");
const announceMentRouter = require("./router/announceMentRouter");
const studentLiabilitiesRouter = require("./router/studentLiabilitiesRouter");
const studentGradeRouter = require("./router/studentGradeRouter");
const forgotPasswordRouter = require("./router/forgotPasswordRouter");
const historyRouter = require("./router/historyRouter");
const captcha = require("./captcha/captcha");

const app = express();
const dirname___ = path.resolve();

app.use(express.json());
app.use(cors());
app.use(
  "/src/admin-profile",
  express.static(path.join(dirname___, "/src/admin-profile"))
);
app.use(
  "/src/announcement-image",
  express.static(path.join(dirname___, "/src/announcement-image"))
);
app.use(
  "/src/faculty-profile",
  express.static(path.join(dirname___, "/src/faculty-profile"))
);
app.use(
  "/src/student-profile",
  express.static(path.join(dirname___, "/src/student-profile"))
);

app.use("/auth", userRouter);
app.use("/student-schedule", studentScheduleRouter);
app.use("/faculty-schedule", facultyScheduleRouter);
app.use("/subject", subjectRouter);
app.use("/strand", strandRouter);
app.use("/section", sectionRouter);
app.use("/faculty", facultyRouter);
app.use("/student", studentRouter);
app.use("/announcement", announceMentRouter);
app.use("/captcha", captcha);
app.use("/student-liabilities", studentLiabilitiesRouter);
app.use("/student-grade", studentGradeRouter);
app.use("/", forgotPasswordRouter);
app.use("/history", historyRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3030, () =>
  console.log(`Server running in port ${process.env.PORT}`)
);
