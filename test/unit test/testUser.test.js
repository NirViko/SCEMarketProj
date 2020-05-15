const checkTheUser = require('../../src/user');

test('Checks that the user name exists so that we cannot create a registration',() =>{
    checkTheUser.CheckValidEmail('qwert@gmail.com',function(result){
        expect(result).toBe(true)
    })
    
})

test('Checks whether the user does not exist so that we can register',() =>{
        checkTheUser.CheckValidEmail('dhsidhs@gmail.com',function(result){
            expect(result).toBe(false)
        })
    })


test('Checks if the name and user and password are correct then return user information if you do not return false(all valid)',() =>{
    let userInput = {
        email : 'jsndjsas@gmail.com',
        password : '12345678'}

        checkTheUser.executeStatement(userInput,function(result){
            expect(result[0]).toBe(true)
        })
    })

test('Checks if the name and user and password are correct then return user information if you do not return false (email not valid)',() =>{
        let userInput = {
            email : 'qwerewt@gmail.com',
            password : '1234567'}
    
            checkTheUser.executeStatement(userInput,function(result){
                expect(result[0]).toBe(false)
            })
        })

    
test('Checks if the name and user and password are correct then return user information if you do not return false (Password not valid)',() =>{
        let userInput = {
                email : 'qwert@gmail.com',
                password : '1234567212'}
        
                checkTheUser.executeStatement(userInput,function(result){
                    expect(result[0]).toBe(false)
                })
            })

test('Checks if the name and user and password are correct then return user information if you do not return false (Password and email not valid)',() =>{
    let userInput = {
            email : 'qwersast@gmail.com',
            password : '1234567212'}
                
            checkTheUser.executeStatement(userInput,function(result){
                    expect(result[0]).toBe(false)
                    })
            })
