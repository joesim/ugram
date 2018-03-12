const search = (req, res) => {
    res.json(req.query.q);
}
export { search };
