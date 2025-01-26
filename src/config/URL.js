
const url = process.env.REACT_DEV_MODE==="production"?process.env.REACT_APP_ENDPOINT:process.env.REACT_APP_URL

export default url