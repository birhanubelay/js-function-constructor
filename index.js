//1
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
}
FeatureToggle.prototype.canAccess = function (userRole) {
    return this.isEnabled && this.userGroupAccess.includes(userRole);
};
FeatureToggle.prototype.toggleFeature = function (flag) {
    this.isEnabled = flag;
};
let featureDemand = new FeatureToggle("Software Management", false, ["admins", "betaTesters"]);
console.log(featureDemand.canAccess("manager"));
featureDemand.toggleFeature(true);
console.log(featureDemand);
let userRole = "public";
if (featureDemand.canAccess(userRole)) {
    console.log("Access granted to feature.");
} else {
    switch (userRole) {
        case "admins":
        case "betaTesters":
            console.log("Feature is not enabled.");
            break;
        default:
            console.log("Access denied.");
    }
};

// 2
function TimeLog(freelancerName, projectDetails,logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs;
};
TimeLog.prototype.addTotalEarning = function () {
    return this.logs.reduce((total, entry) => {
        return total + (entry.hoursWorked * this.projectDetails.hourlyRate);
    }, 0);
};

TimeLog.prototype.getEntriesInDateRange = function (startDate, endDate) {
    return this.logs.filter(log => log.date >= startDate && log.date <= endDate);
};
TimeLog.prototype.hasExceededWeeklyHours = function () {
    let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
    if (totalHours > 40) {
      console.log(`${this.freelancerName} worked more this week.`);
    } else {
      console.log(`${this.freelancerName} worked Within normal hours this week.`);
    };
};
const freelancerProject = new TimeLog("Selam Birhane",
    { name: "weather forcasting", hourlyRate: 50 },  
    [
    { date: "2024-01-01", hoursWorked: 8 },
    { date: "2024-01-02", hoursWorked: 6 },
    { date: "2024-01-08", hoursWorked: 10 },
    { date: "2024-01-09", hoursWorked: 7 },
    { date: "2024-01-10", hoursWorked: 9 },
    { date: "2024-01-16", hoursWorked: 8 },
  ]);
freelancerProject.hasExceededWeeklyHours();
console.log(freelancerProject.getEntriesInDateRange("2024-01-01","2024-01-10"));
console.log(freelancerProject.addTotalEarning());

// 3
function Order(customerInfo, itemsList, status) {
    this.customerInfo = customerInfo;
    this.itemsList = itemsList;
    this.status = status;
}
Order.prototype.calculateTotalCost = function () {
    return this.itemsList.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
};
Order.prototype.updateStatus = function (paymentReceived) {
    return this.calculateTotalCost()===paymentReceived ? "Paid" : "Pending";
};
Order.prototype.filterUrgentCategory = function () {
    switch (this.status) {
        case "Pending":
          console.log("Order needs urgent attention.");
          break;
        case "Paid":
          console.log("Order is being processed.");
          break;
        default:
          console.log("Order status unknown.");
          break;
      };
    
};
const ordering=new Order({name:"Bisrat",email:"bisrat@gmail.com"},
    [
        { productName: "phone", quantity: 1, unitPrice: 12000 },
        { productName: "earpods", quantity: 1, unitPrice: 2500 },
        { productName: "charger", quantity: 1, unitPrice: 750 }
      ],"Pending"  
);
console.log(ordering.calculateTotalCost());
console.log(ordering.updateStatus(15300));
ordering.filterUrgentCategory();
// 4
function Employee(id, name, performanceMetrics,feedbackList) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = performanceMetrics;
    this.feedbackList =feedbackList;
}
Employee.prototype.calculateAverageScore = function () {
    const scores = Object.values(this.performanceMetrics);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return totalScore / scores.length;
};
Employee.prototype.getPerformanceLevel = function () {
    const averageScore = this.calculateAverageScore();
    if (averageScore >= 4.5) {
        return "Excellent";
    } else if (averageScore >= 3.5) {
        return "Good";
    } else {
        return "Needs Improvement";
    }
};
Employee.prototype.addFeedback = function (comment) {
    this.feedbackList.push(comment);
};
const employeeDetail=new Employee(12345,"Tsega Hagos",
    {communication:40,
    reliability:43, 
    efficiency:35},
    ["You really did a great job", "You need to do more on time management","You need some improvement on the leadership skills"]

);
employeeDetail.addFeedback("Keep it up");
console.log(employeeDetail);
console.log(employeeDetail.calculateAverageScore());
console.log(employeeDetail.getPerformanceLevel());

// 5
function Course(title, instructor,students) {
    this.title = title;
    this.instructor = instructor;
    this.students =students;
}
Course.prototype.getCompletedStudentNames = function () {
    return this.students
        .filter(student => student.completionStatus)
        .map(student => student.name);
};
Course.prototype.countStudentsByExpertise= function () {
    const expertiseCounts = {};
    this.students.forEach(student => {
        const expertise = student.expertise;
        if (!expertiseCounts[expertise]) {
            expertiseCounts[expertise] = 0;
        }
        expertiseCounts[expertise]++;
    });
    return expertiseCounts;
};
Course.prototype.instructorMessage = function () {
    return this.students.length > 5
        ? "You have a full class!"
        : "Consider recruiting more students.";
};
const takeCourses=new Course("Frontend Development", 
    {name: "Dawit Hailu", expertise: "Web Developer" },
    [
        { name: "Aron", completionStatus: true, expertise: "Data Science" },
        { name: "Danny", completionStatus: false, expertise: "Web Development" },
        { name: "William", completionStatus: true, expertise: "Web Development" },
        { name: "Kidus", completionStatus: true, expertise: "Web Development" },
        { name: "Silvana", completionStatus: false, expertise: "sotware development" }
      ]
      
      
);
console.log(takeCourses.instructorMessage());
console.log(takeCourses.getCompletedStudentNames());
console.log(takeCourses.countStudentsByExpertise());