import { h } from 'vue'

const Plural = (props) => {
    const value = props.value;

    if (value % 10 === 1 && value % 100 !== 11) {
        return h('span', props.one)
    } else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        return h('span', props.few)
    } else {
        return h('span', props.many || props.few)
    }
}

Plural.props = {
    value: {
        type: Number,
        required: true,
    },
    one: {
        type: String,
        required: true,
    },
    few: {
        type: String,
        required: true,
    },
    many: {
        type: String,
    },
}

export default Plural