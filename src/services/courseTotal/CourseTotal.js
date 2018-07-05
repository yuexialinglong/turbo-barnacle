import qs from 'qs';

//获取每日课表统计
export function GetDayReport(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/class-sch/dailyLessonStatic?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//老师摘要查询
export function GetAllTeacher(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/user-tch?row=500&isUse=1`, {
        method : 'get'
    });
}

//班级摘要查询
export function GetClassSum(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/class-info/listSimpleSelective?row=500`, {
        method : 'get'
    });
}

//课程摘要查询
export function GetAllCourse(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/course-info?row=500&isUse=1`, {
        method : 'get'
    });
}

//获取上课时间段
export function GetSchTimeRange(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-common/sched-span`, {
        method : 'get'
    });
}

//获取课次状态
export function GetCourseStatus(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/class-sch/getStatuss`, {
        method : 'get'
    });
}

//排课总表查询
export function GetTableList(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/class-sch?${qs.stringify(params)}`, {
        method : 'get'
    });
}

//取消课程
export function cancelCourse(params) {
    return window.requestData(`${window.BASE_URL}/pdabc-crm/class-sch/cancel/${params}`, {
        method : 'PUT'
    });
}
