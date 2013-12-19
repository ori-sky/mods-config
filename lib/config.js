/*
 *  Copyright 2013 David Farrell
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var fs = require('fs')

exports.load_config = function(path)
{
    if(path === undefined) path = process.cwd() + '/config.json'
    if(typeof path !== 'string') throw new Error('path must be a string')

    var contents = fs.readFileSync(path, 'utf8')
    return JSON.parse(contents)
}

var config = undefined
exports.name = 'config'
exports.$load = function(name, path)
{
    if(name === this.name)
    {
        config = this.load_config(path)

        for(var k in config)
        {
            this.__mods.target(k, 'load', config[k])
        }
    }
    else if(config[name] !== undefined)
    {
        this.__mods.target(name, 'load', config[name])
    }
}
