export default class ApiError extends Error{

    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],

    ){
        super(message)
        this.statusCode= statusCode
        this.message= message
        this.success = false;
        this.errors = errors
    }
}
// export { ApiError}

//dont know whats the error default export works fine but normal doesnt

//this file tells us that any api error will follow these standards