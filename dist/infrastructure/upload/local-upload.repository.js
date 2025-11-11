"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUploadRepository = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
let LocalUploadRepository = class LocalUploadRepository {
    async saveFile(file) {
        const filename = file.filename || path.basename(file.path || file.filename);
        const url = `/uploads/${filename}`;
        return { url, filename, originalname: file.originalname };
    }
};
exports.LocalUploadRepository = LocalUploadRepository;
exports.LocalUploadRepository = LocalUploadRepository = __decorate([
    (0, common_1.Injectable)()
], LocalUploadRepository);
//# sourceMappingURL=local-upload.repository.js.map