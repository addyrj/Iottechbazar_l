const os = require("os");
const db = require("../../DB/config");
const requestIp = require('request-ip');
const { generateProductSlug } = require("../Helper/GenerateToken");
const isEmpty = require("lodash.isempty")

const TrackLog = db.trackLog;

const checkIp = async (req, res) => {
    try {
        // let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

        const clientIp = requestIp.getClientIp(req);
        res.status(200).json({
            status: 200,
            message: "success",
            info: clientIp
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const checkDeviceOrigin = async (req, res) => {
    try {
        const arch = os.arch();
        const availableParallelism = os.availableParallelism();
        const cpus = os.cpus();
        const endianness = os.endianness();
        const freemem = os.freemem();
        const getPriority = os.getPriority();
        const homedir = os.homedir();
        const hostname = os.hostname();
        const loadavg = os.loadavg();
        const networkInterfaces = os.networkInterfaces();
        const platform = os.platform();
        const release = os.release();
        const tmpdir = os.tmpdir();
        const totalmem = os.totalmem();
        const type = os.type();
        const userInfo = os.userInfo();
        const uptime = os.uptime();
        const version = os.version();
        const machine = os.machine();

        return res.status(200).json({
            status: 200,
            message: "Os data fetch succesfully",
            data: {
                osArch: arch,
                osAvailable: availableParallelism,
                osCpus: cpus,
                osEndinerss: endianness,
                osFreeMen: freemem,
                osGetPriority: getPriority,
                osHomeDir: homedir,
                osHostName: hostname,
                osLoadSvg: loadavg,
                osNetworkInterface: networkInterfaces,
                osPlatform: platform,
                osRelease: release,
                osTempDir: tmpdir,
                osTotalMen: totalmem,
                osType: type,
                osUserInfo: userInfo,
                osUpTime: uptime,
                osVersion: version,
                osMachine: machine
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const testApi = async (req, res) => {
    try {
        const browserType = req.get("User-Agent")

        res.status(200).send({
            status: 200,
            message: browserType
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const createAdminTrackLog = async (req, res, next) => {
    try {
        const admin = req.admin;
        const accesstype = req.body.accessType;

        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! you are not authorized"
            })
        } else if (isEmpty(accesstype)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please enter access type"
            })
        } else {
            const slug = await generateProductSlug(admin.name)
            const clientIp = await requestIp.getClientIp(req);
            const clientInfo = await req.useragent;
            let fetch_res = await fetch(`https://ipapi.co/json/`);
            let clientLocation = await fetch_res.json();

            const info = {
                slug: slug,
                role: admin.role === "Admin" ? "SuperAdmin" : admin.role,
                name: admin.name,
                contact: admin.contact,
                accessType: accesstype,
                ip: clientIp,
                platform: clientInfo?.platform,
                description: clientInfo?.source,
                isMobile: clientInfo?.isMobile,
                isDesktop: clientInfo?.isDesktop,
                location: clientLocation
            }

            await TrackLog.create(info)
                .then((res) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Track log data created succssfully",
                        data: info
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Faild! Track log data not created",
                        data: error
                    })
                })

        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const createUserTrackLog = async (req, res, next) => {
    try {

        try {
            const user = req.user;
            const accesstype = req.body.accessType;
            if (!user) {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! you are not authorized"
                })
            } else if (isEmpty(accesstype)) {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! Please enter access type"
                })
            } else {
                const slug = await generateProductSlug(user.name)
                const clientIp = await requestIp.getClientIp(req);
                const clientInfo = await req.useragent;
                let fetch_res = await fetch(`https://ipapi.co/json/`);
                let clientLocation = await fetch_res.json();

                const info = {
                    slug: slug,
                    role: "user",
                    name: user.name,
                    contact: user.contact,
                    accessType: accesstype,
                    ip: clientIp,
                    platform: clientInfo?.platform,
                    description: clientInfo?.source,
                    isMobile: clientInfo?.isMobile,
                    isDesktop: clientInfo?.isDesktop,
                    location: JSON.stringify(clientLocation)
                }

                await TrackLog.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Track log data create successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Track log is not ",
                            info: error
                        })
                    })
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: true,
                message: error.message || error
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const getTrackLog = async (req, res, next) => {
    try {
        const admin = req.admin;

        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You are not authorized"
            })
        } else {
            const checkLog = await TrackLog.findAll();
            if (checkLog.length !== 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Log data fetch successfull",
                    info: checkLog
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Log is not found"
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

module.exports = { checkIp, checkDeviceOrigin, testApi, createAdminTrackLog, createUserTrackLog, getTrackLog }
