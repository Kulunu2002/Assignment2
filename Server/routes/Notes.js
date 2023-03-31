const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const auth = require('../middleware/auth')

router.post("/notes/add", auth, async (req, res) => {
  const note = new Note({ ...req.body, "owner": req.user._id });
  try {
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/notes/get/me", auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/notes/get/single/:id", async (req, res) => {

  const _id = req.params.id
  console.log(_id)

  try {
    const notes = await Note.findOne({ _id });
    res.status(200).send(notes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.patch("/notes/update/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["title", "note"];
  const isValidOperation = updates.every((update) => {
    return allowUpdates.includes(update);
  });
  if (!isValidOperation) {
    res.send({ ERROR: "INVALID OPERATION!" });
  } try {
    //should check owner id also
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/notes/delete/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete({ _id: req.params.id, })
    if (!deletedNote) {
      res.status(404).send()
    }
    res.status(200).send(deletedNote)

  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router;
