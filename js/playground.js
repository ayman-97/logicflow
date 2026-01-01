// js/playground.js

// مسارات البوابات
const gateSchemas = {
    AND: { body: "M 10,5 L 35,5 A 20,20 0 0 1 35,45 L 10,45 Z", bubble: null, tail: null },
    OR: { body: "M 10,5 C 20,5 25,25 10,45 C 30,45 45,35 55,25 C 45,15 30,5 10,5 Z", bubble: null, tail: null },
    NOT: { body: "M 15,5 L 50,25 L 15,45 Z", bubble: { cx: 54, cy: 25, r: 4 }, tail: null },
    NAND: { body: "M 10,5 L 35,5 A 20,20 0 0 1 35,45 L 10,45 Z", bubble: { cx: 58, cy: 25, r: 4 }, tail: null },
    NOR: { body: "M 10,5 C 20,5 25,25 10,45 C 30,45 45,35 55,25 C 45,15 30,5 10,5 Z", bubble: { cx: 59, cy: 25, r: 4 }, tail: null },
    XOR: { body: "M 18,5 C 28,5 33,25 18,45 C 38,45 53,35 63,25 C 53,15 38,5 18,5 Z", bubble: null, tail: "M 8,5 C 18,5 23,25 8,45" },
    XNOR: { body: "M 18,5 C 28,5 33,25 18,45 C 38,45 53,35 63,25 C 53,15 38,5 18,5 Z", bubble: { cx: 67, cy: 25, r: 4 }, tail: "M 8,5 C 18,5 23,25 8,45" }
};

Object.assign(window.topicsData, {
    "playground": {
        title: "🛠️ المختبر الهندسي (أسلاك مستقيمة)",
        content: `
            <h3>المختبر الرقمي</h3>
            <div id="playground-container" class="playground-area" onmousedown="handleCanvasMouseDown(event)" oncontextmenu="cancelWiring(event)">
                
                <div class="toolbox">
                    <div style="display:flex; gap:5px; margin-bottom:5px;">
                         <button class="tool-btn mini" onclick="toggleDarkMode()" title="الوضع الليلي">🌙</button>
                         <button class="tool-btn mini" onclick="exportImage()" title="تصدير صورة">📷</button>
                         <button class="tool-btn mini" onclick="saveCircuit()" title="حفظ ملف">💾</button>
                         <button class="tool-btn mini" onclick="triggerLoad()" title="فتح ملف">📂</button>
                    </div>

                    <div class="tool-title" style="margin-top:5px;">تحكم</div>
                    <div style="display:flex; gap:5px; margin-bottom:5px;">
                        <button class="tool-btn mini" onclick="undo()" title="تراجع">↩️</button>
                        <button class="tool-btn mini" onclick="redo()" title="إعادة">↪️</button>
                    </div>
                    <div style="display:flex; gap:5px; margin-bottom:5px;">
                        <button class="tool-btn mini" onclick="changeZoom(0.1)">➕</button>
                        <button class="tool-btn mini" onclick="resetZoom()">1:1</button>
                        <button class="tool-btn mini" onclick="changeZoom(-0.1)">➖</button>
                    </div>
                    <div id="zoom-level" style="text-align:center; color:#bdc3c7; font-size:10px; margin-bottom:10px;">Zoom: 100%</div>

                    <div class="tool-title">المكونات</div>
                    <button class="tool-btn" onclick="spawnComponent('SWITCH')">🎚️ Switch</button>
                    <button class="tool-btn" onclick="spawnComponent('BULB')">💡 Bulb</button>

                    <div class="tool-title" style="margin-top:10px;">البوابات</div>
                    ${generateGateBtn('AND')} ${generateGateBtn('OR')} ${generateGateBtn('NOT')}
                    ${generateGateBtn('NAND')} ${generateGateBtn('NOR')}
                    ${generateGateBtn('XOR')} ${generateGateBtn('XNOR')}
                    
                    <hr style="margin:10px 0; border-color:#555;">
                    <div style="display:flex; gap:5px; flex-wrap:wrap;">
                        <button class="tool-btn mini" style="background:#8e44ad; flex:1;" onclick="showEquation()">∑ معادلة</button>
                        <button class="tool-btn mini" style="background:#8e44ad; flex:1;" onclick="showTruthTable()">📊 جدول</button>
                    </div>
                    <input type="file" id="fileInput" style="display:none;" onchange="loadCircuit(this)">
                    
                    <button class="tool-btn delete-btn" style="margin-top:10px;" onclick="deleteSelected()">❌ حذف المحدد</button>
                    <button class="tool-btn" style="background:#c0392b; font-size:12px; margin-top:5px;" onclick="clearPlayground()">🗑️ مسح الكل</button>
                </div>

                <div class="canvas-wrapper" id="canvas-wrapper">
                    <div id="canvas-area" class="canvas-area">
                        <svg id="wire-layer" style="width:100%; height:100%; position:absolute; top:0; left:0; pointer-events:none; overflow:visible;"></svg>
                        <div id="selection-box"></div>
                    </div>
                </div>
            </div>

            <div id="analysis-panel" style="display:none; margin-top:20px; background:#fff; border:2px solid #34495e; border-radius:10px; padding:20px;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:15px;">
                    <h3 id="analysis-title" style="margin:0; color:#2c3e50;">النتيجة</h3>
                    <button onclick="closeAnalysis()" style="background:#e74c3c; color:white; border:none; padding:5px 15px; border-radius:5px; cursor:pointer;">إغلاق</button>
                </div>
                <div id="analysis-content"></div>
            </div>
        `,
        toolHTML: "" 
    }
});

function generateGateBtn(type) {
    const s = gateSchemas[type];
    let pathHTML = `<path d="${s.body}" fill="none" stroke="white" stroke-width="3"/>`;
    if(s.tail) pathHTML += `<path d="${s.tail}" fill="none" stroke="white" stroke-width="3"/>`;
    if(s.bubble) pathHTML += `<circle cx="${s.bubble.cx}" cy="${s.bubble.cy}" r="${s.bubble.r}" fill="none" stroke="white" stroke-width="3"/>`;
    return `<button class="tool-btn gate-item" onclick="spawnComponent('${type}')">
        <svg viewBox="0 0 80 50" width="35" height="20" style="margin-left:5px;">${pathHTML}</svg> ${type}
    </button>`;
}

// =================================================================
// المتغيرات
// =================================================================
let components = [];
let wires = [];
let selectedObjects = []; 
let isDraggingGroup = false;
let dragStartMouse = { x: 0, y: 0 }; 
let initialPositions = {}; 
let isBoxSelecting = false;
let boxStart = { x: 0, y: 0 };
let isWiring = false;
let tempWire = null;
let startPort = null;
let currentWirePoints = [];
let currentZoom = 1.0;
const GRID_SIZE = 20;
let historyStack = [];
let redoStack = [];

// =================================================================
// 🔥 1. منطق التوصيل المتعامد (Orthogonal Wiring Logic) 🔥
// =================================================================

// دالة مساعدة لحساب النقطة المتعامدة (Snap to Orthogonal)
function getOrthogonalPoint(lastPoint, currentPoint) {
    const dx = Math.abs(currentPoint.x - lastPoint.x);
    const dy = Math.abs(currentPoint.y - lastPoint.y);
    
    // إذا كان التحرك الأفقي أكبر، نحافظ على الـ Y ثابتاً (خط أفقي)
    // وإلا نحافظ على الـ X ثابتاً (خط عمودي)
    if (dx > dy) {
        return { x: currentPoint.x, y: lastPoint.y };
    } else {
        return { x: lastPoint.x, y: currentPoint.y };
    }
}

// دالة مساعدة لتقريب النقطة للشبكة
function snapToGrid(point) {
    return {
        x: Math.round(point.x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(point.y / GRID_SIZE) * GRID_SIZE
    };
}

// البدء
window.startWiring = function(e, compId, portName) {
    e.stopPropagation(); if(isDraggingGroup) return;
    saveState();
    isWiring = true; startPort = { compId, portName }; currentWirePoints = [];
    
    // نقطة البداية (مركز المنفذ)
    const startEl = document.getElementById(compId + '_' + portName);
    const canvas = document.getElementById('canvas-area');
    const canvasRect = canvas.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const startX = ((startRect.left - canvasRect.left) + (startRect.width / 2)) / currentZoom;
    const startY = ((startRect.top - canvasRect.top) + (startRect.height / 2)) / currentZoom;
    
    // إضافة نقطة البداية (بدون تقريب للشبكة لأنها يجب أن تخرج من المنفذ)
    currentWirePoints.push({x: startX, y: startY});

    const svg = document.getElementById('wire-layer');
    tempWire = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    tempWire.setAttribute("stroke", "#7f8c8d"); tempWire.setAttribute("stroke-width", "3"); tempWire.setAttribute("stroke-dasharray", "5,5"); tempWire.setAttribute("fill", "none");
    svg.appendChild(tempWire);
    document.addEventListener('mousemove', onWireMove);
}

// الحركة (مع الإجبار على الاستقامة)
function onWireMove(e) {
    if (!isWiring || !tempWire) return;
    
    const rawPos = getCanvasCoordinates(e);
    // 1. نقرب موقع الماوس للشبكة
    const snappedPos = snapToGrid(rawPos);
    
    // 2. نحصل على آخر نقطة ثابتة
    const lastPoint = currentWirePoints[currentWirePoints.length - 1];

    // 3. نحسب النقطة المتعامدة (إما أفقية تماماً أو عمودية تماماً)
    const orthoPos = getOrthogonalPoint(lastPoint, snappedPos);

    // نعرض السلك المؤقت
    const allPoints = [...currentWirePoints, orthoPos];
    const pointsStr = allPoints.map(p => `${p.x},${p.y}`).join(" ");
    tempWire.setAttribute("points", pointsStr);
}

// النقر لإضافة زاوية (Corner)
window.handleCanvasMouseDown = function(e) {
    if (isWiring) {
        if (e.target.classList.contains('port')) return;
        
        const rawPos = getCanvasCoordinates(e);
        const snappedPos = snapToGrid(rawPos);
        const lastPoint = currentWirePoints[currentWirePoints.length - 1];
        
        // نضيف النقطة المتعامدة فقط (لضمان أن الزاوية قائمة)
        const orthoPos = getOrthogonalPoint(lastPoint, snappedPos);
        
        // إضافة النقطة للقائمة
        currentWirePoints.push(orthoPos);
        return;
    }
    // ... بقية كود التحديد ...
    if (e.target.closest('.component') || e.target.closest('.port') || e.target.closest('.wire-line')) return;
    deselectAll(); isBoxSelecting = true;
    const pos = getCanvasCoordinates(e);
    boxStart = { x: pos.x, y: pos.y };
    const box = document.getElementById('selection-box');
    box.style.left = boxStart.x + 'px'; box.style.top = boxStart.y + 'px'; box.style.width = '0'; box.style.height = '0'; box.style.display = 'block';
    document.addEventListener('mousemove', handleBoxMove); document.addEventListener('mouseup', handleBoxEnd);
}

// الإنهاء
window.endWiring = function(e, compId, portName) {
    e.stopPropagation(); 
    if (!isWiring) return; 
    if (startPort.compId === compId) return;

    // نقطة النهاية (المنفذ)
    const endEl = document.getElementById(compId + '_' + portName);
    const canvas = document.getElementById('canvas-area');
    const canvasRect = canvas.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    const endX = ((endRect.left - canvasRect.left) + (endRect.width / 2)) / currentZoom;
    const endY = ((endRect.top - canvasRect.top) + (endRect.height / 2)) / currentZoom;
    const endPoint = {x: endX, y: endY};

    // 🔥 اللمسة السحرية: إضافة زاوية أخيرة تلقائية للوصول للمنفذ بشكل مستقيم 🔥
    const lastPoint = currentWirePoints[currentWirePoints.length - 1];
    
    // هل نحن على نفس الخط؟
    if (Math.abs(lastPoint.x - endPoint.x) > 5 && Math.abs(lastPoint.y - endPoint.y) > 5) {
        // إذا لم نكن على نفس الخط، نضيف نقطة تعامد أخيرة
        const orthoLast = getOrthogonalPoint(lastPoint, endPoint);
        currentWirePoints.push(orthoLast);
    }

    currentWirePoints.push(endPoint);

    // إنشاء السلك
    const wireId = `wire_${Date.now()}`;
    const svg = document.getElementById('wire-layer');
    const newWire = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    newWire.setAttribute("id", wireId); newWire.setAttribute("class", "wire-line");
    newWire.setAttribute("stroke", "#333"); newWire.setAttribute("stroke-width", "4"); newWire.setAttribute("fill", "none");
    
    const pointsStr = currentWirePoints.map(p => `${p.x},${p.y}`).join(" ");
    newWire.setAttribute("points", pointsStr);
    newWire.onclick = (ev) => selectObject(ev, 'wire', wireId);
    svg.appendChild(newWire);

    const middlePoints = currentWirePoints.slice(1, currentWirePoints.length - 1);
    wires.push({ id: wireId, from: startPort.compId, to: compId, toPort: portName, el: newWire, waypoints: middlePoints });
    cancelWiring(); simulateCircuit();
}

window.cancelWiring = function(e) {
    if(e) e.preventDefault();
    if(tempWire) tempWire.remove(); tempWire = null; startPort = null; isWiring = false; currentWirePoints = [];
    document.removeEventListener('mousemove', onWireMove);
}

// تحديث الأسلاك عند التحريك (يحافظ على الزوايا القائمة قدر الإمكان)
function updateWires() {
    const canvas = document.getElementById('canvas-area');
    const canvasRect = canvas.getBoundingClientRect();
    wires.forEach(w => {
        const fromEl = document.getElementById(w.from + '_out');
        const toEl = document.getElementById(w.to + '_' + w.toPort);
        if(fromEl && toEl) {
            const r1 = fromEl.getBoundingClientRect();
            const startX = ((r1.left - canvasRect.left) + (r1.width / 2)) / currentZoom;
            const startY = ((r1.top - canvasRect.top) + (r1.height / 2)) / currentZoom;
            const r2 = toEl.getBoundingClientRect();
            const endX = ((r2.left - canvasRect.left) + (r2.width / 2)) / currentZoom;
            const endY = ((r2.top - canvasRect.top) + (r2.height / 2)) / currentZoom;
            const allPoints = [{x: startX, y: startY}, ...w.waypoints, {x: endX, y: endY}];
            const pointsStr = allPoints.map(p => `${p.x},${p.y}`).join(" ");
            w.el.setAttribute("points", pointsStr);
        }
    });
}

// =================================================================
// بقية الكود (التحديد، السحب، التحليل، التراجع) كما هو
// =================================================================
// التحديد والسحب
function handleBoxMove(e) { if (!isBoxSelecting) return; const pos = getCanvasCoordinates(e); const width = Math.abs(pos.x - boxStart.x); const height = Math.abs(pos.y - boxStart.y); const newLeft = (pos.x < boxStart.x) ? pos.x : boxStart.x; const newTop = (pos.y < boxStart.y) ? pos.y : boxStart.y; const box = document.getElementById('selection-box'); box.style.width = width + 'px'; box.style.height = height + 'px'; box.style.left = newLeft + 'px'; box.style.top = newTop + 'px'; }
function handleBoxEnd(e) { if (!isBoxSelecting) return; isBoxSelecting = false; const box = document.getElementById('selection-box'); box.style.display = 'none'; const boxLeft = parseFloat(box.style.left); const boxTop = parseFloat(box.style.top); const boxWidth = parseFloat(box.style.width); const boxHeight = parseFloat(box.style.height); const boxRight = boxLeft + boxWidth; const boxBottom = boxTop + boxHeight; if (boxWidth < 5 && boxHeight < 5) return; components.forEach(comp => { const compLeft = comp.el.offsetLeft; const compTop = comp.el.offsetTop; const compWidth = comp.el.offsetWidth; const compHeight = comp.el.offsetHeight; const compRight = compLeft + compWidth; const compBottom = compTop + compHeight; const isOverlapping = !(boxRight < compLeft || boxLeft > compRight || boxBottom < compTop || boxTop > compBottom); if (isOverlapping) addToSelection('comp', comp.id); }); }
function addToSelection(type, id) { if(!selectedObjects.find(obj => obj.id === id)) { selectedObjects.push({ type, id }); document.getElementById(id)?.classList.add('selected'); } }
window.selectObject = function(e, type, id) { e.stopPropagation(); if(!e.shiftKey) deselectAll(); addToSelection(type, id); }
window.deselectAll = function() { selectedObjects.forEach(obj => document.getElementById(obj.id)?.classList.remove('selected')); selectedObjects = []; }
window.deleteSelected = function() { if (selectedObjects.length === 0) return; saveState(); const toDelete = [...selectedObjects]; toDelete.forEach(obj => { if (obj.type === 'comp') removeComponent(obj.id); else if (obj.type === 'wire') removeWire(obj.id); }); selectedObjects = []; }
function removeWire(id) { document.getElementById(id)?.remove(); wires = wires.filter(w => w.id !== id); simulateCircuit(); }
function removeComponent(id) { document.getElementById(id)?.remove(); components = components.filter(c => c.id !== id); const attachedWires = wires.filter(w => w.from === id || w.to === id); attachedWires.forEach(w => removeWire(w.id)); wires = wires.filter(w => w.from !== id && w.to !== id); simulateCircuit(); }
function handleComponentMouseDown(e, id) { if(e.target.classList.contains('port')) return; e.stopPropagation(); const isAlreadySelected = selectedObjects.find(obj => obj.id === id); if (!isAlreadySelected && !e.shiftKey) { deselectAll(); addToSelection('comp', id); } else if (!isAlreadySelected && e.shiftKey) { addToSelection('comp', id); } if (selectedObjects.length > 0) { saveState(); isDraggingGroup = true; dragStartMouse = { x: e.clientX, y: e.clientY }; initialPositions = {}; selectedObjects.forEach(obj => { if(obj.type === 'comp') { const el = document.getElementById(obj.id); initialPositions[obj.id] = { left: parseInt(el.style.left || 0), top: parseInt(el.style.top || 0) }; } }); document.addEventListener('mousemove', onGroupDrag); document.addEventListener('mouseup', stopGroupDrag); } }
function onGroupDrag(e) { if (!isDraggingGroup) return; e.preventDefault(); const deltaX = (e.clientX - dragStartMouse.x) / currentZoom; const deltaY = (e.clientY - dragStartMouse.y) / currentZoom; selectedObjects.forEach(obj => { if(obj.type === 'comp' && initialPositions[obj.id]) { const el = document.getElementById(obj.id); let newLeft = initialPositions[obj.id].left + deltaX; let newTop = initialPositions[obj.id].top + deltaY; newLeft = Math.round(newLeft / GRID_SIZE) * GRID_SIZE; newTop = Math.round(newTop / GRID_SIZE) * GRID_SIZE; el.style.left = newLeft + 'px'; el.style.top = newTop + 'px'; } }); updateWires(); }
function stopGroupDrag() { isDraggingGroup = false; initialPositions = {}; document.removeEventListener('mousemove', onGroupDrag); document.removeEventListener('mouseup', stopGroupDrag); }
// الدوال المساعدة
function getCanvasCoordinates(e) { const canvasRect = document.getElementById('canvas-area').getBoundingClientRect(); return { x: (e.clientX - canvasRect.left) / currentZoom, y: (e.clientY - canvasRect.top) / currentZoom }; }
// التراجع والحفظ والتصدير
function saveState() { const state = JSON.stringify({ components: components.map(c => ({ id: c.id, type: c.type, state: c.state, left: c.el.style.left, top: c.el.style.top })), wires: wires.map(w => ({ id: w.id, from: w.from, to: w.to, toPort: w.toPort, waypoints: w.waypoints })) }); if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== state) { historyStack.push(state); if (historyStack.length > 20) historyStack.shift(); redoStack = []; } }
window.undo = function() { if (historyStack.length === 0) return; const currentState = JSON.stringify({ components: components.map(c => ({ id: c.id, type: c.type, state: c.state, left: c.el.style.left, top: c.el.style.top })), wires: wires.map(w => ({ id: w.id, from: w.from, to: w.to, toPort: w.toPort, waypoints: w.waypoints })) }); redoStack.push(currentState); const prevState = historyStack.pop(); loadStateInternal(prevState); }
window.redo = function() { if (redoStack.length === 0) return; const currentState = JSON.stringify({ components: components.map(c => ({ id: c.id, type: c.type, state: c.state, left: c.el.style.left, top: c.el.style.top })), wires: wires.map(w => ({ id: w.id, from: w.from, to: w.to, toPort: w.toPort, waypoints: w.waypoints })) }); historyStack.push(currentState); const nextState = redoStack.pop(); loadStateInternal(nextState); }
function loadStateInternal(jsonStr) { const data = JSON.parse(jsonStr); document.getElementById('canvas-area').innerHTML = '<svg id="wire-layer" style="width:100%; height:100%; position:absolute; top:0; left:0; pointer-events:none; overflow:visible;"></svg><div id="selection-box"></div>'; components = []; wires = []; selectedObjects = []; if(data.components) data.components.forEach(c => spawnComponent(c.type, c, false)); if(data.wires) { const svg = document.getElementById('wire-layer'); data.wires.forEach(w => { const newWire = document.createElementNS("http://www.w3.org/2000/svg", "polyline"); newWire.setAttribute("id", w.id); newWire.setAttribute("class", "wire-line"); newWire.setAttribute("stroke", "#333"); newWire.setAttribute("stroke-width", "4"); newWire.setAttribute("fill", "none"); newWire.onclick = (ev) => selectObject(ev, 'wire', w.id); svg.appendChild(newWire); wires.push({ id: w.id, from: w.from, to: w.to, toPort: w.toPort, el: newWire, waypoints: w.waypoints || [] }); }); } updateWires(); simulateCircuit(); }
window.toggleDarkMode = function() { document.body.classList.toggle('dark-mode'); simulateCircuit(); }
window.exportImage = function() { const node = document.getElementById('canvas-area'); if (typeof htmlToImage === 'undefined') { alert("جاري تحميل المكتبة..."); return; } htmlToImage.toPng(node, { backgroundColor: document.body.classList.contains('dark-mode') ? '#2c3e50' : '#ecf0f1' }).then(function (dataUrl) { var link = document.createElement('a'); link.download = 'my-circuit.png'; link.href = dataUrl; link.click(); }).catch(function (error) { console.error('oops, something went wrong!', error); }); }
window.spawnComponent = function(type, savedData = null, recordHistory = true) { if (recordHistory) saveState(); const id = savedData ? savedData.id : 'comp_' + Date.now(); const left = savedData ? savedData.left : '160px'; const top = savedData ? savedData.top : '160px'; const canvas = document.getElementById('canvas-area'); const el = document.createElement('div'); const isGate = !!gateSchemas[type]; el.className = `component ${type.toLowerCase()} ${isGate ? 'gate-comp' : ''}`; el.id = id; el.style.left = left; el.style.top = top; el.setAttribute('data-type', type); let contentHTML = ''; if (type === 'SWITCH') { contentHTML = `<div class="port output" id="${id}_out" onmousedown="startWiring(event, '${id}', 'out')"></div>`; el.innerHTML = contentHTML; el.onclick = (e) => toggleSwitch(e, id); } else if (type === 'BULB') { contentHTML = `<div class="port input" id="${id}_in" style="bottom:-8px; left:50%; transform:translateX(-50%); top:auto;" onmouseup="endWiring(event, '${id}', 'in')"></div>`; el.innerHTML = `<div class="bulb-glass"><div class="filament"></div><div class="reflection"></div></div><div class="bulb-base"></div>${contentHTML}`; } else if (isGate) { const s = gateSchemas[type]; let svgContent = `<path d="${s.body}" class="gate-body" />`; if (s.tail) svgContent += `<path d="${s.tail}" class="gate-tail" fill="none" stroke="#34495e" stroke-width="3" />`; if (s.bubble) svgContent += `<circle cx="${s.bubble.cx}" cy="${s.bubble.cy}" r="${s.bubble.r}" class="gate-bubble" fill="white" stroke="#34495e" stroke-width="3" />`; const svgHTML = `<svg viewBox="0 0 80 50" class="gate-svg" style="width:100%; height:100%; pointer-events:none;">${svgContent}</svg>`; let inputsHTML = ''; if (type === 'NOT') { inputsHTML = `<div class="port input" style="top:50%; left:12px; transform:translateY(-50%);" id="${id}_in" onmouseup="endWiring(event, '${id}', 'in')"></div>`; } else if (type === 'XOR' || type === 'XNOR') { inputsHTML = ` <div class="port input" style="top:25%; left:5px; transform:translateY(-50%);" id="${id}_in1" onmouseup="endWiring(event, '${id}', 'in1')"></div> <div class="port input" style="top:75%; left:5px; transform:translateY(-50%);" id="${id}_in2" onmouseup="endWiring(event, '${id}', 'in2')"></div> `; } else { inputsHTML = ` <div class="port input" style="top:25%; left:-4px; transform:translateY(-50%);" id="${id}_in1" onmouseup="endWiring(event, '${id}', 'in1')"></div> <div class="port input" style="top:75%; left:-4px; transform:translateY(-50%);" id="${id}_in2" onmouseup="endWiring(event, '${id}', 'in2')"></div> `; } const outRight = s.bubble ? '-8px' : '15px'; const outputHTML = `<div class="port output" style="top:50%; right:${outRight}; transform:translateY(-50%);" id="${id}_out" onmousedown="startWiring(event, '${id}', 'out')"></div>`; el.innerHTML = svgHTML + inputsHTML + outputHTML; } el.onmousedown = (e) => handleComponentMouseDown(e, id); canvas.appendChild(el); let initialState = savedData ? savedData.state : 0; components.push({ id: id, type: type, state: initialState, el: el }); if(type === 'SWITCH' && initialState === 1) el.classList.add('on'); }
window.toggleSwitch = function(e, id) { const comp = components.find(c => c.id === id); if(comp) { comp.state = comp.state ? 0 : 1; comp.el.classList.toggle('on'); simulateCircuit(); } }
function simulateCircuit() { for(let i=0; i<components.length + 2; i++) { components.forEach(comp => { let in1 = 0, in2 = 0, inVal = 0; wires.forEach(w => { if(w.to === comp.id) { const sourceComp = components.find(c => c.id === w.from); if(sourceComp) { const val = sourceComp.state; if(w.toPort === 'in1') in1 = val; if(w.toPort === 'in2') in2 = val; if(w.toPort === 'in') inVal = val; w.el.setAttribute("stroke", val ? "#2ecc71" : document.body.classList.contains('dark-mode') ? "#95a5a6" : "#333"); w.el.style.filter = val ? "drop-shadow(0 0 2px #2ecc71)" : "none"; if(w.el.classList.contains('selected')) w.el.style.stroke = "#e74c3c"; } } }); let res = 0; switch(comp.type) { case 'AND': res = (in1 && in2); break; case 'OR': res = (in1 || in2); break; case 'XOR': res = (in1 ^ in2); break; case 'NOT': res = !inVal; break; case 'NAND': res = !(in1 && in2); break; case 'NOR': res = !(in1 || in2); break; case 'XNOR': res = !(in1 ^ in2); break; case 'BULB': res = inVal; break; case 'SWITCH': res = comp.state; break; } if (comp.type !== 'SWITCH') comp.state = res ? 1 : 0; if (comp.type === 'BULB') { if(comp.state) comp.el.classList.add('on'); else comp.el.classList.remove('on'); } else if (gateSchemas[comp.type]) { const color = comp.state ? "#2ecc71" : document.body.classList.contains('dark-mode') ? "#95a5a6" : "#34495e"; const body = comp.el.querySelector('.gate-body'); if(body) { body.style.stroke = color; body.style.filter = comp.state ? "drop-shadow(0 0 2px #2ecc71)" : "none"; } const bubble = comp.el.querySelector('.gate-bubble'); if(bubble) bubble.style.stroke = color; const tail = comp.el.querySelector('.gate-tail'); if(tail) tail.style.stroke = color; } }); } }
window.saveCircuit = function() { const dataToSave = { components: components.map(c => ({ id: c.id, type: c.type, state: c.state, left: c.el.style.left, top: c.el.style.top })), wires: wires.map(w => ({ id: w.id, from: w.from, to: w.to, toPort: w.toPort, waypoints: w.waypoints })) }; const blob = new Blob([JSON.stringify(dataToSave)], {type: "application/json"}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = "circuit.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
window.triggerLoad = function() { document.getElementById('fileInput').click(); }
window.loadCircuit = function(input) { const file = input.files[0]; if(!file) return; const reader = new FileReader(); reader.onload = function(e) { try { saveState(); loadStateInternal(e.target.result); } catch(err) { alert("ملف غير صالح"); } }; reader.readAsText(file); input.value = ''; }
window.clearPlayground = function() { if(confirm("مسح الكل؟")) { saveState(); document.getElementById('canvas-area').innerHTML = '<svg id="wire-layer" style="width:100%; height:100%; position:absolute; top:0; left:0; pointer-events:none; overflow:visible;"></svg><div id="selection-box"></div>'; components = []; wires = []; selectedObjects = []; } }
window.showEquation = function() { const bulbs = components.filter(c => c.type === 'BULB'); if (bulbs.length === 0) { alert("أضف مصباحاً."); return; } const switches = components.filter(c => c.type === 'SWITCH').sort((a, b) => parseInt(a.el.style.top) - parseInt(b.el.style.top)); const switchLabels = {}; const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; switches.forEach((sw, i) => switchLabels[sw.id] = chars[i] || `SW${i}`); let html = ""; bulbs.forEach((bulb, index) => { const wire = wires.find(w => w.to === bulb.id); let expr = wire ? traceExpression(wire.from, switchLabels) : "0"; html += `<div style="font-size:1.4em; margin-bottom:15px; padding:10px; background:#ecf0f1; border-radius:5px;"><strong>Output ${index+1}:</strong> <span class="math" style="color:#2980b9; direction:ltr; display:inline-block;">F = ${expr}</span></div>`; }); displayResult("المعادلة", html); }
function traceExpression(compId, labels) { const comp = components.find(c => c.id === compId); if (!comp) return "?"; if (comp.type === 'SWITCH') return labels[comp.id]; const inputWires = wires.filter(w => w.to === comp.id); let in1 = "0", in2 = "0"; const getIn = (port) => { const w = inputWires.find(w => w.toPort === port); return w ? traceExpression(w.from, labels) : "0"; }; if (comp.type === 'NOT') return `<span style="text-decoration:overline;">${getIn('in')}</span>`; in1 = getIn('in1'); in2 = getIn('in2'); switch(comp.type) { case 'AND': return `(${in1} &middot; ${in2})`; case 'OR': return `(${in1} + ${in2})`; case 'XOR': return `(${in1} &oplus; ${in2})`; case 'NAND': return `<span style="text-decoration:overline;">(${in1} &middot; ${in2})</span>`; case 'NOR': return `<span style="text-decoration:overline;">(${in1} + ${in2})</span>`; case 'XNOR': return `<span style="text-decoration:overline;">(${in1} &oplus; ${in2})</span>`; } return "?"; }
window.showTruthTable = function() { const switches = components.filter(c => c.type === 'SWITCH').sort((a, b) => parseInt(a.el.style.top) - parseInt(b.el.style.top)); const bulbs = components.filter(c => c.type === 'BULB'); if (switches.length === 0 || bulbs.length === 0) { alert("يجب وجود مفاتيح ومصابيح."); return; } if (switches.length > 5 && !confirm("الجدول كبير. متابعة؟")) return; const originalStates = switches.map(s => s.state); const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; let tableHTML = `<table class="comparison-table" style="text-align:center; width:100%; direction:ltr;"><thead><tr style="background:#34495e; color:white;">`; switches.forEach((s, i) => tableHTML += `<th>${chars[i] || 'SW'+i}</th>`); bulbs.forEach((b, i) => tableHTML += `<th style="background:#27ae60;">Out ${i+1}</th>`); tableHTML += `</tr></thead><tbody>`; const totalRows = Math.pow(2, switches.length); for (let i = 0; i < totalRows; i++) { switches.forEach((sw, bitIndex) => { sw.state = (i >> (switches.length - 1 - bitIndex)) & 1; }); simulateCircuit(); tableHTML += `<tr>`; switches.forEach(sw => tableHTML += `<td>${sw.state}</td>`); bulbs.forEach(bulb => tableHTML += `<td style="font-weight:bold; background:${bulb.state?'#d5f5e3':''}; color:${bulb.state?'#27ae60':''};">${bulb.state}</td>`); tableHTML += `</tr>`; } tableHTML += `</tbody></table>`; switches.forEach((s, i) => { s.state = originalStates[i]; if(s.state) s.el.classList.add('on'); else s.el.classList.remove('on'); }); simulateCircuit(); displayResult("جدول الحقيقة", tableHTML); }
function displayResult(title, content) { document.getElementById('analysis-title').innerText = title; document.getElementById('analysis-content').innerHTML = content; document.getElementById('analysis-panel').style.display = 'block'; document.getElementById('analysis-panel').scrollIntoView({behavior: "smooth", block: "start"}); }
window.closeAnalysis = function() { document.getElementById('analysis-panel').style.display = 'none'; document.getElementById('playground-container').scrollIntoView({behavior: "smooth"}); }
window.changeZoom = function(delta) { currentZoom += delta; if (currentZoom < 0.5) currentZoom = 0.5; if (currentZoom > 2.0) currentZoom = 2.0; applyZoom(); }
window.resetZoom = function() { currentZoom = 1.0; applyZoom(); }
function applyZoom() { document.getElementById('canvas-area').style.transform = `scale(${currentZoom})`; document.getElementById('zoom-level').innerText = `Zoom: ${Math.round(currentZoom * 100)}%`; }
document.addEventListener('keydown', function(e) { 
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObjects.length > 0) deleteSelected(); 
    else if(e.key === 'Escape' && isWiring) cancelWiring();
    else if(e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
    else if(e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
});