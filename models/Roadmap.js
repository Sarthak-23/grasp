const mongoose = require('mongoose');

const RoadmapSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    start: Date,
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null }, // if cloned from other roadmap
    path: [
        {
            subpath: [
                {
                    index: { type: Number, require: true }, // sort order
                    topic: { type: String, require: true },
                    description: String,
                    materials: [String],
                },
            ],
        },
    ],
    private: { type: Boolean, default: false },
});

const Roadmap = mongoose.model('Roadmap', RoadmapSchema);

module.exports = Roadmap;
