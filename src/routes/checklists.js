const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find();
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (error) {
    res
      .status(422)
      .json(error)
      .render("pages/error", { error: "erro em exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "erro em exibir o fornmulario" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res.status(404).render("pages/error", { error: "erro em editar a lista" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res.status(422).render("pages/error", { error: "erro em exibir a lista" });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.status(201).redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.update({ name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.erros;
    res
      .status(422)
      .render("checlists/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.status(200).redirect("/checklists");
  } catch (error) {
    res.status(422).render("pages/error", { error: "erro em exibir a lista" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Checklist.remove();
    res.status(200).json({ message: "Checklists removidos com sucesso" });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
